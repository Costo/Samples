// using System;
// using System.Collections.Generic;
// using System.Globalization;
// using System.IO;
// using System.Linq;
// using System.Reflection;
// using System.Threading.Tasks;
// using DocumentFormat.OpenXml.Packaging;
// using DocumentFormat.OpenXml.Spreadsheet;
// using Microsoft.Extensions.FileProviders;
// using SixLabors.ImageSharp;
// using SixLabors.ImageSharp.PixelFormats;
// using SixLabors.ImageSharp.Processing;

// namespace ImageToExcel.Services
// {
//     public class OpenXmlExcelGenerator: IExcelGenerator
//     {
//         private const int ImageWidth = 100;
//         private readonly Assembly _assembly;

//         public OpenXmlExcelGenerator()
//         {
//             _assembly = GetType().Assembly;
//         }

//         public MemoryStream Generate(MemoryStream imageStream)
//         {
//             using (var image = Image.Load(imageStream.ToArray()))
//             {
//                 image.Mutate(x => x
//                         .Resize(ImageWidth, image.Height / image.Width * ImageWidth));

//                 var colorSet = GetColorSet(image);
//                 var colorList = colorSet.ToList();
                
//                 var resultStream = new MemoryStream();
//                 var names = _assembly.GetManifestResourceNames();
//                 //throw new InvalidOperationException(string.Join(", ", names));
//                 using(var stream = _assembly.GetManifestResourceStream("monalisa-blazor.empty.xlsx"))
//                 {
//                     if(stream == null)
//                     {
//                         throw new InvalidOperationException("nuuuulllll");
//                     }
//                     using (var emptyDocument = SpreadsheetDocument.Open(stream, false))
//                     using(var spreadsheetDocument = (SpreadsheetDocument)emptyDocument.Clone(resultStream))
//                     {
//                         var workbookPart = spreadsheetDocument.WorkbookPart;

//                         var stylesheetPart = workbookPart.WorkbookStylesPart;
//                         UpdateStylesheet(stylesheetPart.Stylesheet, colorList, out var colorIndexes);

//                         var worksheetPart = workbookPart.WorksheetParts.First();
//                         var sheetData = worksheetPart.Worksheet.Elements<SheetData>().First();

//                         AddColumnsElement(worksheetPart);
//                         AddRows(worksheetPart, image, colorIndexes);
//                         spreadsheetDocument.Close();
//                     }
//                 }

//                 resultStream.Seek(0, SeekOrigin.Begin);
//                 return resultStream;
//             }
//         }

//         private static void AddRows(WorksheetPart worksheetPart, Image<Rgba32> image, IDictionary<Rgba32, uint> colorIndexes)
//         {
//             var sheetData = worksheetPart.Worksheet.Elements<SheetData>().First();
//             for (int row = 0; row < image.Height; row++)
//             {
//                 var rowElement = new Row() { RowIndex = (uint)row + 1 };
//                 sheetData.Append(rowElement);
//                 for (int col = 0; col < image.Width; col++)
//                 {
//                     var pixel = image[col, row];
//                     var cellReference = GetCellReference(row + 1, col + 1);
//                     rowElement.Append(new Cell()
//                     {
//                         CellReference = cellReference,
//                         StyleIndex = colorIndexes[pixel]
//                     });
//                 }
//             }
//         }

//         private static void AddColumnsElement(WorksheetPart worksheetPart)
//         {
//             // This resizes the width of the columns in order to have squarish cells
//             var columns = new Columns();
//             columns.Append(new Column
//             {
//                 CustomWidth = true,
//                 Min = 1,
//                 Max = 100,
//                 Width = 2.14,
//             });

//             // Columns must be inserted before SheetData element to respect the document schema
//             var sheetData = worksheetPart.Worksheet.Elements<SheetData>().First();
//             worksheetPart.Worksheet.InsertBefore(columns, sheetData);
//         }

//         private static HashSet<Rgba32> GetColorSet(Image<Rgba32> image)
//         {
//             var colorSet = new HashSet<Rgba32>();
//             for (int row = 0; row < image.Height; row++)
//                 for (int col = 0; col < image.Width; col++)
//                 {
//                     colorSet.Add(image[col, row]);
//                 }
//             return colorSet;
//         }

//         private static void UpdateStylesheet(Stylesheet stylesheet, IList<Rgba32> colors, out IDictionary<Rgba32, uint> colorIndexes)
//         {
//             // Create a new Fill element for each color
//             var fills = stylesheet.Fills;
//             uint fillOffset = fills.Count;
//             fills.Append(colors.Select(x => new Fill
//             {
//                 PatternFill =  new DocumentFormat.OpenXml.Spreadsheet.PatternFill
//                 {
//                     PatternType = PatternValues.Solid,
//                     ForegroundColor = new ForegroundColor() { Rgb = x.A.ToString("X2") + x.R.ToString("X2") + x.G.ToString("X2") + x.B.ToString("X2") },
//                     BackgroundColor = new BackgroundColor() { Indexed = 64U },
//                 },
//             }));
//             fills.Count += (uint)colors.Count;

//             // For each new Fill, create a corresponding CellFormat element
//             var cellFormats = stylesheet.CellFormats;
//             var cellFormatsOffset = cellFormats.Count;
//             cellFormats.Append(colors.Select((_, i) => new CellFormat
//             {
//                 NumberFormatId = 0U,
//                 FontId = 0U,
//                 BorderId = 0U,
//                 FormatId = 0U,
//                 FillId = (uint)i + fillOffset,
//                 ApplyFill = true, // Only the Fill is applied, other values are ignored(?)
//             }));
//             cellFormats.Count += (uint)colors.Count;

//             // This dictionary gives the index of the cellFormat for each color
//             colorIndexes = colors
//                 .Select((Item, Index) => (Item, Index))
//                 .ToDictionary(x => x.Item, x => (uint)x.Index + cellFormatsOffset);

//         }

//         private static string GetCellReference(int row, int column)
//         {
//             if (row < 1)
//             {
//                 throw new ArgumentOutOfRangeException(nameof(row));
//             }
//             if (column < 1 || column > 16_384)
//             {
//                 throw new ArgumentOutOfRangeException(nameof(column));
//             }

//             int div = column;
//             var letters = new Stack<char>(3);
//             int mod = 0;

//             while (div > 0)
//             {
//                 mod = (div - 1) % 26;
//                 letters.Push((char)('A' + mod));
//                 div = ((div - mod) / 26);
//             }
//             return string.Concat(letters) + row.ToString(CultureInfo.InvariantCulture);
//         }
//     }
// }