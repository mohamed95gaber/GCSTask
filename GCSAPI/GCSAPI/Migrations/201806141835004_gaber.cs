namespace GCSAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class gaber : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Course", "isDeleted", c => c.Boolean());
            AddColumn("dbo.Instructor", "isDeleted", c => c.Boolean());
            AddColumn("dbo.Student", "isDeleted", c => c.Boolean());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Student", "isDeleted");
            DropColumn("dbo.Instructor", "isDeleted");
            DropColumn("dbo.Course", "isDeleted");
        }
    }
}
