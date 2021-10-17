using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IMissingRepository
    {
         void Update(Missing missing);
         Task<bool> SaveAllAsync();
         Task<PagedList<MissingDto>> GetMissingsAsync(UserParams userParams);
         Task<MissingDto> GetMissingByIdAsync(int id);
         Task<MissingDto> GetMissingByUsernameAsync(string username);

         Task<Missing> GetMissingsByIdAsync(int id);
    }
}