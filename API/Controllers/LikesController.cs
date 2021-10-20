using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController
    {   
        private readonly IUserRepository _userRepository;
        private readonly ILikesRepository _likesRepository;
        private readonly IMissingRepository _missingRepository;
        public LikesController(IUserRepository userRepository, IMissingRepository missingRepository, ILikesRepository likesRepository)
        {
            _missingRepository = missingRepository;
            _likesRepository = likesRepository;
            _userRepository = userRepository;
        }

        [HttpPost("{id}")]
        public async Task<ActionResult> AddLike(int id)
        {
            var sourceUserId = User.GetUserId();
            var likedMissing = await _missingRepository.GetMissingByIdAsync(id);
            var sourceUser = await _likesRepository.GetMissingWithLikes(sourceUserId);
            var likedUser = await _userRepository.GetUserByIdAsync(likedMissing.Informer.Id);

            if (likedMissing == null) return NotFound();

            if (likedMissing.Informer.Id == sourceUserId) return BadRequest("You cannot follow your own reported missing person");

            var userLike = await _likesRepository.GetUserLike(sourceUserId, likedMissing.Id);

            if (userLike != null) return BadRequest("You already follow this person");

            userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                LikedMissingId = likedMissing.Id,
                LikedUserId = likedUser.Id
            };

            sourceUser.LikedMissings.Add(userLike);

            if (await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to follow person");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes([FromQuery]LikesParams likesParams)
        {
            likesParams.Id = User.GetUserId();
            var users = await _likesRepository.GetUserLikes(likesParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(users);
        }
    }
}