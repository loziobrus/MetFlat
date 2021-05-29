using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace MetFlat.Model.Entities
{
    public class User : IdentityUser
    {
        public string Name { get; set; }

        public int Age { get; set; }

        public string City { get; set; }

        public int Active { get; set; }

        public string Bio { get; set; }

        public string Photo { get; set; }

        public List<Flat> Flats { get; set; }

        public List<Rental> Rentals { get; set; }
    }
}
