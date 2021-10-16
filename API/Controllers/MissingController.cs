using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MissingController : BaseApiController
    {
        private readonly IMissingRepository _missingRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public MissingController(IMissingRepository missingRepository, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _missingRepository = missingRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MissingDto>>> GetMissings()
        {
            var missings = await _missingRepository.GetMissingsAsync();

            return Ok(missings);
        }

        [HttpGet("{id}", Name = "GetMissing")]
        public async Task<ActionResult<MissingDto>> GetMissing(int id)
        {
            return await _missingRepository.GetMissingByIdAsync(id);
        }

        [HttpGet("a/{username}")]
        public async Task<ActionResult<MissingDto>> GetMissingByUser(string username)
        {
            return await _missingRepository.GetMissingByUsernameAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMissing(MissingUpdateDto missingUpdateDto)
        {
            var missing = await _missingRepository.GetMissingsByIdAsync(missingUpdateDto.Id);

            _mapper.Map(missingUpdateDto, missing);

            _missingRepository.Update(missing);

            if (await _missingRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update Missing Person");
        }

        [HttpPost("add-photo/{id}")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(int id, IFormFile file)
        {
            var missing = await _missingRepository.GetMissingsByIdAsync(id);

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (missing.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            missing.Photos.Add(photo);

            if (await _missingRepository.SaveAllAsync())
            {
                return CreatedAtRoute("GetMissing", new { id = id }, _mapper.Map<PhotoDto>(photo));
            }

            return BadRequest("Problem Adding Photo");
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var missingDto = await _missingRepository.GetMissingByUsernameAsync(User.GetUsername());

            var missingId = missingDto.Id;

            var missing = await _missingRepository.GetMissingsByIdAsync(missingId);

            var photo = missing.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo.IsMain) return BadRequest("This is already your main photo");

            var currentMain = missing.Photos.FirstOrDefault(x => x.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            if (await _missingRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to set main photo");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var missingDto = await _missingRepository.GetMissingByUsernameAsync(User.GetUsername());

            var missingId = missingDto.Id;

            var missing = await _missingRepository.GetMissingsByIdAsync(missingId);

            var photo = missing.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("You cannot delete main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            missing.Photos.Remove(photo);

            if (await _missingRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete the photo");
        }
    }
}