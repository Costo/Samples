using System;
using System.IO;
using System.Linq;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace ImageToExcel.Services
{
    public class EPPlusExcelGenerator : ExcelGeneratorBase
    {
        protected override MemoryStream GenerateFromImage(Image<Rgba32> image)
        {
            using(var stream = this.GetEmptyExcelSpreadsheetDocument())
            {
                using(var p = new ExcelPackage(stream))
                {
                    var ws = p.Workbook.Worksheets.First();
                    for (int row = 0; row < image.Height; row++)
                    for (int col = 0; col < image.Width; col++)
                    {
                        var pixel = image[col, row];
                        var cell = ws.Cells[row + 1, col + 1];
                        cell.Style.Fill.PatternType = ExcelFillStyle.Solid;
                        cell.Style.Fill.BackgroundColor.SetColor(pixel.A, pixel.R, pixel.G,pixel.B);
                    }

                    // This makes the application crash
                    // See: https://github.com/aspnet/Blazor/issues/1661
                    // for (int col = 0; col < image.Width; col++)
                    // {
                    //     ws.Column(col + 1).Width = 2.14;
                    // }

                    var outputStream = new MemoryStream();
                    p.SaveAs(outputStream);
                    return outputStream;
                }
            }
        }
    }
}