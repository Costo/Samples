using Microsoft.JSInterop;
using System;
using System.IO;
using System.Threading.Tasks;

namespace ImageToExcelLib
{
    public static class JsInterop
    {
        public static async Task SaveAsFile(MemoryStream excelFileStream, string filename)
        {
            await JSRuntime.Current.InvokeAsync<object>(
                "saveAsFile",
                filename,
                Convert.ToBase64String(excelFileStream.ToArray())
            );
        }
    }
}
