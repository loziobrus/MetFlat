﻿namespace MetFlat.Model.Entities
{
    public interface IEntity<T>
    {
        T Id { get; set; }
    }
}
