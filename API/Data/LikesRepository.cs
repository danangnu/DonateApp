using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;
        public LikesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<AppUser> GetMissingWithLikes(int userId)
        {
            return await _context.Users
                .Include(x => x.LikedMissings)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }

        public async Task<UserLike> GetUserLike(int sourceUserId, int likedMissingId)
        {
            return await _context.Likes.FindAsync(sourceUserId,likedMissingId);
        }

        public async Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int Id)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();
            var missings = _context.Missing.AsQueryable();
            List<LikeDto> likeDto = new List<LikeDto>();

            if (predicate == "liked")
            {
                likes = likes.Where(like => like.SourceUserId == Id);
                missings = likes.Select(like => like.LikedMissing);
                users = likes.Select(like => like.SourceUser);

                likeDto = await missings.Select(missing => new LikeDto
                {
                    Id = missing.Id,
                    LikeByUsername = missing.AppUser.UserName,
                    LastName = missing.LastName,
                    FirstName = missing.FirstName,
                    Age = missing.DateOfBirth.CalculateAge(),
                    PhotoUrl = missing.Photos.FirstOrDefault(p => p.IsMain).Url

                }).ToListAsync();
            }            

            if (predicate == "likedBy")
            {
                var missingjoin = missings
                        .Join(likes, p => p.Id, pc => pc.LikedMissingId, (p, pc) => new { p, pc })
                        .Join(users, ppc => ppc.pc.SourceUserId, c => c.Id, (ppc, c) => new {ppc, c})
                        .Join(users, ppc1 => ppc1.ppc.pc.LikedUserId, s => s.Id, (ppc1, s) => new {
                            LikedUserId = ppc1.ppc.pc.LikedUserId,
                            MissingId = ppc1.ppc.p.Id, // or ppc.pc.ProdId
                            Username1 = ppc1.c.UserName,
                            Username2 = s.UserName,
                            Lastname = ppc1.ppc.p.LastName,
                            Firstname = ppc1.ppc.p.FirstName,
                            Age = ppc1.ppc.p.DateOfBirth.CalculateAge(),
                            PhotoUrl = ppc1.ppc.p.Photos.FirstOrDefault(p => p.IsMain).Url
                        }).Where(u => u.LikedUserId == Id);

                likeDto = await missingjoin.Select(missing => new LikeDto
                {
                    Id = missing.MissingId,
                    LikeByUsername = missing.Username1,
                    LikeUsername = missing.Username2,
                    LastName = missing.Lastname,
                    FirstName = missing.Firstname,
                    Age = missing.Age,
                    PhotoUrl = missing.PhotoUrl

                }).ToListAsync();
            }
            return likeDto;
        }
    }
}