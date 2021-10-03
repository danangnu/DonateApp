using System.Collections.Generic;
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
    }
}