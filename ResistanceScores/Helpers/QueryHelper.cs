using System;
using System.Linq.Expressions;
using ResistanceScores.Enums;
using ResistanceScores.Models;

namespace ResistanceScores.Helpers
{
    public class QueryHelper
    {
        public static Expression<Func<GamePlayer, bool>> GetTeamWhereClause(Team team)
        {
            Expression<Func<GamePlayer, bool>> teamClause;
            switch (team)
            {
                case Team.Resistance:
                    teamClause = g => g.WasResistance;
                    break;
                case Team.Spy:
                    teamClause = g => !g.WasResistance;
                    break;
                default:
                    teamClause = g => true;
                    break;
            }
            return teamClause;
        }

        public static Expression<Func<GamePlayer, bool>> GetTimescaleWhereClause(Timescale timescale)
        {
            Expression<Func<GamePlayer, bool>> timescaleClause;
            var thisMonday = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek + (int)DayOfWeek.Monday);
            switch (timescale)
            {
                case Timescale.Last30Days:
                    timescaleClause = g => DateTime.Now.Month == g.Game.Date.Month && DateTime.Now.Year == g.Game.Date.Year;
                    break;
                case Timescale.Last7Days:
                    timescaleClause = g => thisMonday <= g.Game.Date;
                    break;
                default:
                    timescaleClause = g => true;
                    break;
            }
            return timescaleClause;
        }

        public static Expression<Func<GamePlayer, bool>> GetGameSizeWhereClause(int gameSize)
        {
            Expression<Func<GamePlayer, bool>> gameSizeClause;
            if (gameSize > 4) // 4 is the "All team sizes" option
            {
                gameSizeClause = g => g.Game.Players.Count == gameSize;
            }
            else
            {
                gameSizeClause = g => true;
            }
            return gameSizeClause;
        }

        public static Expression<Func<GamePlayer, bool>> GetAsOfWhenWhereClause(int asOfWhen)
        {
            return g => g.Game.Date.AddDays(asOfWhen) < DateTime.Now;
        }

        public static Expression<Func<GamePlayer,bool>> GetWinWhereClause()
        {
            return g =>
                (g.WasResistance && g.Game.ResistanceWin) ||
                (!g.WasResistance && !g.Game.ResistanceWin);
        }
    }
}
