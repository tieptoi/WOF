using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WOF.Services;
using WOF.Models;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.JsonPatch;
using AutoMapper;
using WOF.Entities;
using System.Threading;

namespace WOF.Controllers
{
	[Route("api/prize")]
	public class PrizeController : Controller
	{
		private readonly ILogger<PrizeController> _iLogger;
		private readonly IPrizeRepository _prizeRepository;

		public PrizeController(IPrizeRepository prizeRepository, ILogger<PrizeController> iLogger)
		{
			_prizeRepository = prizeRepository;
			_iLogger = iLogger;
		}

		public IActionResult GetPrizes()
		{
			try
			{
				Thread.Sleep(1000);
				var prizeEntities = _prizeRepository.GetAllPrizes();

				var results = AutoMapper.Mapper.Map<IEnumerable<PrizeDto>>(prizeEntities);

				return Ok(results);
			}
			catch (Exception ex)
			{
				_iLogger.LogCritical("Unknown occurred during get prize in Prize Controller", ex);
				return StatusCode(500, "A Problem happened while handling your request");
			}
		}

		[HttpGet("{id}", Name = "GetPrize")]
		public IActionResult GetPrize(int id)
		{
			Thread.Sleep(1000);
			var prizeEntity = _prizeRepository.GetPrize(id);

			if (prizeEntity == null)
			{
				return NotFound();
			}
			var result = AutoMapper.Mapper.Map<PrizeDto>(prizeEntity);

			return Ok(result);
		}

		[HttpPost]
		public IActionResult CreatePrize([FromBody] PrizeForCreateDto prize)
		{
			try
			{
				Thread.Sleep(2000);
				if (prize == null)
				{
					return BadRequest();
				}

				if (prize.Description == prize.Name)
				{
					ModelState.AddModelError("description", "The provided description should be different from the name.");
				}

				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}

				var prizeEntity = Mapper.Map<Prize>(prize);

				_prizeRepository.AddPrize(prizeEntity);

				if (!_prizeRepository.Save())
				{
					return StatusCode(500, "A problem happened while handling your request.");
				}

				var createdPrizeDtoToReturn = Mapper.Map<PrizeDto>(prizeEntity);

				return CreatedAtRoute("GetPrize", new { id = createdPrizeDtoToReturn.Id }, createdPrizeDtoToReturn);
			}
			catch (Exception ex)
			{
				_iLogger.LogCritical("Unknown occurred during creating prize in Prize Controller", ex);
				return StatusCode(500, "A problem happened while handling your request.");
			}
		}

		[HttpPut("{id}")]
		public IActionResult UpdatePrize(int id,
		  [FromBody] PrizeForUpdateDto prize)
		{
			try
			{
				Thread.Sleep(1000);
				if (prize == null)
				{
					return BadRequest();
				}

				if (prize.Description == prize.Name)
				{
					ModelState.AddModelError("description", "The provided description should be different from the name.");
				}

				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}

				var prizeEntity = _prizeRepository.GetPrize(id);

				if (prizeEntity == null)
				{
					return NotFound();
				}

				Mapper.Map(prize, prizeEntity);


				if (!_prizeRepository.Save())
				{
					return StatusCode(500, "A problem happened while handling your request.");
				}

				return NoContent();
			}
			catch (Exception ex)
			{
				_iLogger.LogCritical("Unknown occurred during updating prize in Prize Controller", ex);
				return StatusCode(500, "A problem happened while handling your request.");
			}
		}

		[HttpDelete("{id}")]
		public IActionResult DeletePrize(int id)
        {
            Thread.Sleep(1000);
			var prizeEntity = _prizeRepository.GetPrize(id);

			if (prizeEntity == null)
			{
				return NotFound();
			}

			_prizeRepository.DeletePrize(prizeEntity);

			if (!_prizeRepository.Save())
			{
				return StatusCode(500, "A problem happened while handling your request.");
			}

			return NoContent();

		}

		[HttpPatch("{id}")]
		public IActionResult PartialUpdatePrize(int id,
			[FromBody] JsonPatchDocument<PrizeForUpdateDto> patchDoc)
		{
			Thread.Sleep(1000);
			if (patchDoc == null)
			{
				return BadRequest();
			}

			var prizeEntity = _prizeRepository.GetPrize(id);

			if (prizeEntity == null)
			{
				return NotFound();
			}

			var prizeToPatch = Mapper.Map<PrizeForUpdateDto>(prizeEntity);

			patchDoc.ApplyTo(prizeToPatch, ModelState);

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			if (prizeToPatch.Description == prizeToPatch.Name)
			{
				ModelState.AddModelError("description", "The provided description should be different from the name.");
			}

			TryValidateModel(prizeToPatch);

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			Mapper.Map(prizeToPatch, prizeEntity);

			if (!_prizeRepository.Save())
			{
				return StatusCode(500, "A problem happened while handling your request.");
			}

			return NoContent();
		}
	}
}