using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ResistanceScores.Models;
using ResistanceScores.Models.api;

namespace ResistanceScores.Services
{
    public static class PairingHelper
    {
        public static List<int[]> GetAll2ItemCombinations(IEnumerable<int> array)
        {
            var combinations = new List<int[]>();
            var alreadyDoneNumbers = new List<int>();

            foreach (var item1 in array)
            {
                alreadyDoneNumbers.Add(item1);
                foreach (var item2 in array.Except(alreadyDoneNumbers))
                {
                    var combination = new int[] { item1, item2 };
                    combinations.Add(combination);
                }
            }
            return combinations;
        }
    }
}
