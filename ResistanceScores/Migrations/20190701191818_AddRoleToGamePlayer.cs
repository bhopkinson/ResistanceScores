using Microsoft.EntityFrameworkCore.Migrations;

namespace ResistanceScores.Migrations
{
    public partial class AddRoleToGamePlayer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Role",
                table: "GamePlayers",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "GamePlayers");
        }
    }
}
