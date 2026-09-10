// سكربت مضمّن صغير يُشغَّل قبل الـHydration لمنع "وميض" التبديل بين الوضعين
// عند إعادة تحميل الصفحة. يقرأ التفضيل المحفوظ من localStorage فقط.
export default function ThemeScript() {
  const code = `
    (function () {
      try {
        var saved = localStorage.getItem('nexora-theme');
        var theme = saved === 'light' || saved === 'dark' ? saved : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
