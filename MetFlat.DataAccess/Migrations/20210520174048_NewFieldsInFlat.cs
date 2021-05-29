using Microsoft.EntityFrameworkCore.Migrations;

namespace MetFlat.DataAccess.Migrations
{
    public partial class NewFieldsInFlat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Balcony",
                table: "Flat",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Elevator",
                table: "Flat",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Fridge",
                table: "Flat",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Iron",
                table: "Flat",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Kitchen",
                table: "Flat",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "MainPhoto",
                table: "Flat",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Microwave",
                table: "Flat",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Oven",
                table: "Flat",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Parking",
                table: "Flat",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "TV",
                table: "Flat",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "WIFI",
                table: "Flat",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "WithKids",
                table: "Flat",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "WithPets",
                table: "Flat",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FlatId = table.Column<int>(type: "int", nullable: false),
                    Path = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_Flat_FlatId",
                        column: x => x.FlatId,
                        principalTable: "Flat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Photos_FlatId",
                table: "Photos",
                column: "FlatId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropColumn(
                name: "Balcony",
                table: "Flat");

            migrationBuilder.DropColumn(
                name: "Elevator",
                table: "Flat");

            migrationBuilder.DropColumn(
                name: "Fridge",
                table: "Flat");

            migrationBuilder.DropColumn(
                name: "Iron",
                table: "Flat");

            migrationBuilder.DropColumn(
                name: "Kitchen",
                table: "Flat");

            migrationBuilder.DropColumn(
                name: "MainPhoto",
                table: "Flat");

            migrationBuilder.DropColumn(
                name: "Microwave",
                table: "Flat");

            migrationBuilder.DropColumn(
                name: "Oven",
                table: "Flat");

            migrationBuilder.DropColumn(
                name: "Parking",
                table: "Flat");

            migrationBuilder.DropColumn(
                name: "TV",
                table: "Flat");

            migrationBuilder.DropColumn(
                name: "WIFI",
                table: "Flat");

            migrationBuilder.DropColumn(
                name: "WithKids",
                table: "Flat");

            migrationBuilder.DropColumn(
                name: "WithPets",
                table: "Flat");
        }
    }
}
