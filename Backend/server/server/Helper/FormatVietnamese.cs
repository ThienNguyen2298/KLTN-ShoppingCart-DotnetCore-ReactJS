using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace server.Helper
{
    public static class FormatVietnamese
    {
        public static bool compareSearch(string parent, string child)
        {
            if(convertToUnSign(parent).Contains(convertToUnSign(child)))
            {
                return true;
            }
            return false;
        }
        public static string convertToUnSign(string s)
        {
            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            string temp = s.Normalize(NormalizationForm.FormD);
            return regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        }
    }
}
