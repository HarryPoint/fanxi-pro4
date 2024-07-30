function MyApp() {
  const languages = ["all", "javascript", "ruby", "java", "css", "python"];
  const getLanguage = () => {
    const language = getQueryParam("language");
    if (language && languages.includes(language)) {
      return language;
    }
    return languages[0];
  };
  const [language, setLanguage] = React.useState(getLanguage());
  React.useEffect(() => {
    updateQueryParam("language", language);
  }, [language]);
  return (
    <div>
      <Header
        language={language}
        languages={languages}
        setLanguage={setLanguage}
      />
      {languages.map((item) => (
        <div key={item} className={classNames({ hidden: language !== item })}>
          <List language={item} />
        </div>
      ))}
    </div>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);
