const Header = (props) => {
  const { language, setLanguage } = props;
  const items = ["all", "javascript", "ruby", "java", "css", "python"];
  return (
    <div className="container mx-auto flex justify-center gap-3">
      {items.map((item) => (
        <a
          key={item}
          onClick={() => setLanguage(item)}
          className={classNames({ "text-red-400": language === item })}
        >
          {item}
        </a>
      ))}
    </div>
  );
};
