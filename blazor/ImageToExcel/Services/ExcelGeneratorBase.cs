using System;
using System.IO;
using System.Threading.Tasks;
using ImageToExcel;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace ImageToExcel.Services
{
    public abstract class ExcelGeneratorBase : IExcelGenerator
    {
        protected const int ImageWidth = 50;

        public MemoryStream Generate(MemoryStream imageStream)
        {
            Console.WriteLine("Start generating spreadsheet");
            try
            {
                using (var image = Image.Load(imageStream.ToArray()))
                {
                    image.Mutate(x => x
                            .Resize(ImageWidth, image.Height / image.Width * ImageWidth));

                    return GenerateFromImage(image);
                }
            }
            finally
            {
                Console.WriteLine("Finished generating spreadsheet");
            }
        }

        protected abstract MemoryStream GenerateFromImage(Image<Rgba32> image);

        protected Stream GetEmptyExcelSpreadsheetDocument()
        {
            return typeof(ExcelGeneratorBase).Assembly .GetManifestResourceStream("ImageToExcel.Services.empty.xlsx");
        } 
    }
}
