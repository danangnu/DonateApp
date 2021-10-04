using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
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

        public async Task<IEnumerable<MissingDto>> GetMissingsAsync()
        {
            return await _context.Missing
                .ProjectTo<MissingDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
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