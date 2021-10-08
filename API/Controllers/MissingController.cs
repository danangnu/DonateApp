using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MissingController : BaseApiController
    {
        private readonly IMissingRepository _missingRepository;
        private readonly IMapper _mapper;
        public MissingController(IMissingRepository missingRepository, IMapper mapper)
        {
            _mapper = mapper;
            _missingRepository = missingRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MissingDto>>> GetMissings()
        {
            var missings = await _missingRepository.GetMissingsAsync();

            return Ok(missings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MissingDto>> GetMissing(int id)
        {
            return await _missingRepository.GetMissingByIdAsync(id);
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
    }
}