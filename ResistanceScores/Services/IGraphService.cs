﻿using ResistanceScores.Models.api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Services
{
    public interface IGraphService
    {
        Task<List<GraphPlayerDto>> GetGraph(QueryOptions queryOptions);
    }
}
