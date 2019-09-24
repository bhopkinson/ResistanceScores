using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ResistanceScores
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
                    {
                        config.AddJsonFile("appsettings.MacOSX.json", optional: false, reloadOnChange: true);

                    }
                    if (hostingContext.HostingEnvironment.IsProduction())
                    {
                        config.AddJsonFile("appsettings.secret.json", optional: false, reloadOnChange: true);
                    }
                })
                .UseStartup<Startup>();
    }
}
