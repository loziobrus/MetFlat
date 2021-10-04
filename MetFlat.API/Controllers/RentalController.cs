using MetFlat.BusinessLogic.Interfaces;
using MetFlat.Model.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MetFlat.API.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class RentalController : Controller
    {
        public readonly IRentalService rentalService;

        public RentalController(IRentalService _rentalService)
        {
            rentalService = _rentalService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<RentalDTO>> GetAll()
        {
            var rentals = rentalService.GetAll();
            return Ok(rentals);
        }

        [HttpGet("getByOwner/{id}")]
        public ActionResult<IEnumerable<RentalDTO>> GetByOwner(string id)
        {
            var rentals = rentalService.GetByOwnerId(id);
            return Ok(rentals);
        }

        [HttpGet("getByTenant/{id}")]
        public ActionResult<IEnumerable<RentalDTO>> GetByTenant(string id)
        {
            var rentals = rentalService.GetByTenantId(id);
            return Ok(rentals);
        }

        [HttpGet("getPendingByOwner/{id}")]
        public ActionResult<IEnumerable<RentalDTO>> GetPendingByOwner(string id)
        {
            var rentals = rentalService.GetPendingByOwnerId(id);
            return Ok(rentals);
        }

        [HttpGet("getPendingByTenant/{id}")]
        public ActionResult<IEnumerable<RentalDTO>> GetPendingByTenant(string id)
        {
            var rentals = rentalService.GetPendingByTenantId(id);
            return Ok(rentals);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RentalDTO>> GetById(int id)
        {
            try
            {
                var rental = await rentalService.GetById(id);
                return Ok(rental);
            }
            catch (NullReferenceException)
            {
                return NotFound("Rental not found.");
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }
        }

        [HttpPost("addRental")]
        [AllowAnonymous]
        public async Task<IActionResult> Add([FromBody] RentalDTO rental)
        {
            try
            {
                await rentalService.Insert(rental);
                return Ok("Rental has been added successfully.");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("approve/{id}")]
        public async Task<IActionResult> Approve(int id)
        {
            try
            {
                await rentalService.ApproveRental(id);
                return Ok("Rental has been approved successfully.");
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }
        }

        [HttpPut("cancel/{id}")]
        public async Task<IActionResult> Cancel(int id)
        {
            try
            {
                await rentalService.CancelRental(id);
                return Ok("Rental has been canceled successfully.");
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }
        }
    }
}