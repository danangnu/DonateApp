using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MissingRepository : IMissingRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MissingRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<MissingDto> GetMissingByIdAsync(int id)
        {
            return await _context.Missing
                .Where(x => x.Id == id)
                .ProjectTo<MissingDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<PagedList<MissingDto>> GetMissingsAsync(UserParams userParams)
        {
            var query = _context.Missing.AsQueryable();

            if (!string.IsNullOrEmpty(userParams.Gender))
                query = query.Where(u => u.Gender == userParams.Gender);

            var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

            query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
        
            return await PagedList<MissingDto>.CreateAsync(query.ProjectTo<MissingDto>(_mapper.ConfigurationProvider).AsNoTracking(), 
                userParams.PageNumber, userParams.PageSize);
        }

        public async Task<MissingDto> GetMissingByUsernameAsync(string username)
        {
            return await _context.Missing
                .Where(x => x.AppUser.UserName == username)
                .ProjectTo<MissingDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

        }
        public async Task<Missing> GetMissingsByIdAsync(int id)
        {
            return await _context.Missing
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Missing missing)
        {
            _context.Entry(missing).State = EntityState.Modified;
        }
    }
}