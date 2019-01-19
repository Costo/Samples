using Blazor.FileReader;
using ImageToExcel.Services;
using Microsoft.AspNetCore.Blazor.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace ImageToExcel
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IFileReaderService, FileReaderService>();
            services.AddSingleton<IExcelGenerator, EPPlusExcelGenerator>();
        }

        public void Configure(IBlazorApplicationBuilder app)
        {
            app.AddComponent<App>("app");
        }
    }
}
