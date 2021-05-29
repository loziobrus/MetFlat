using MetFlat.BusinessLogic.Interfaces;
using MetFlat.Model.DTO;
using MetFlat.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetFlat.API.Controllers
{
    [Route("api/[controller]")]
    public class FlatController : Controller
    {
        public readonly IFlatService flatService;

        public FlatController(IFlatService _flatService)
        {
            flatService = _flatService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlatDTO>>> GetAll(FlatFilters filters)
        {
            var flats = await flatService.GetFiltered(filters);
            return Ok(flats);
        }

        [HttpGet("getByOwner/{id}")]
        public async Task<ActionResult<IEnumerable<FlatDTO>>> GetByOwnerId(string id)
        {
            var flats = await flatService.GetByOwnerId(id);
            return Ok(flats);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FlatDTO>> GetById(int id)
        {
            try
            {
                var flat = await flatService.GetById(id);
                return Ok(flat);
            }
            catch(NullReferenceException)
            {
                return NotFound("Flat not found.");
            }
            catch(Exception e)
            {
                return Problem(e.Message);
            }
        }

        [HttpPost("addFlat")]
        public async Task<IActionResult> Add([FromBody] FlatDTO flat)
        {
            try
            {
                await flatService.Insert(flat);
                return Ok("Flat has been added successfully.");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, [FromBody] FlatDTO flat)
        {
            try
            {
                flatService.Update(id, flat);
                return Ok("Flat has been updated successfully.");
            }
            catch (NullReferenceException)
            {
                return NotFound("Flat not found.");
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                flatService.Delete(id);
                return Ok("Flat has been deleted successfully.");
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }
        }

        [HttpPut("deactivate{id}")]
        public IActionResult Deactivate(int id)
        {
            try
            {
                flatService.Deactivate(id);
                return Ok("Flat has been deactivated successfully.");
            }
            catch (NullReferenceException)
            {
                return NotFound("Flat not found.");
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }
        }
    }
}
