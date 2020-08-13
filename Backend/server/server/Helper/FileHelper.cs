using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helper
{
    public class FileHelper
    {
        public static FileContentResult ExportExcel(Stream stream, string fileName)
        {
            var buffer = stream as MemoryStream;
            return new FileContentResult(buffer.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }
    }
}
