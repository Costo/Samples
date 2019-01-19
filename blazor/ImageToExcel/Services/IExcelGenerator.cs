using System.IO;
using System.Threading.Tasks;

namespace ImageToExcel.Services
{
    public interface IExcelGenerator
    {
        MemoryStream Generate(MemoryStream imageStream);
    }
}