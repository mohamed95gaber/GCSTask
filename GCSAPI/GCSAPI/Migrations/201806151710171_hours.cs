namespace GCSAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class hours : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Course", "hours", c => c.Int());
            DropColumn("dbo.Course", "hourse");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Course", "hourse", c => c.Int());
            DropColumn("dbo.Course", "hours");
        }
    }
}
