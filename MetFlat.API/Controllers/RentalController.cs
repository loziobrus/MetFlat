using MetFlat.BusinessLogic.Interfaces;
using MetFlat.Model.DTO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MetFlat.API.Controllers
{
    [Route("api/[controller]")]
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
            var flats = rentalService.GetAll();
            return Ok(flats);
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

        [HttpPut("{id}")]
        public IActionResult Edit(int id, [FromBody] RentalDTO rental)
        {
            try
            {
                rentalService.Update(id, rental);
                return Ok("Rental has been updated successfully.");
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await rentalService.Delete(id);
                return Ok("Rental has been deleted successfully.");
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }
        }

        [HttpPut("approve{id}")]
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

        //[HttpPut("reject/{id}")]
        //public async Task<IActionResult> Reject(int id)
        //{
        //    try
        //    {
        //        await rentalService.RejectRental(id);
        //        return Ok("Rental has been rejected successfully.");
        //    }
        //    catch (Exception e)
        //    {
        //        return Problem(e.Message);
        //    }
        //}

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