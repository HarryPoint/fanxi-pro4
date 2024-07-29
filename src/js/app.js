function MyApp() {
  const [language, setLanguage] = React.useState(
    getQueryParam("language") || "all"
  );
  React.useEffect(() => {
    updateQueryParam("language", language);
  }, [language]);
  return (
    <div>
      <Header language={language} setLanguage={setLanguage} />
      <List key={language} language={language} />
    </div>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);
