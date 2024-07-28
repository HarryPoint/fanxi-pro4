const Header = () => {
  const items = ["all", "javascript", "ruby", "java", "css", "python"];
  const language = getQueryParam("language") || items[0];
  return (
    <div className="container mx-auto flex justify-center gap-3">
      {items.map((item) => (
        <a
          key={item}
          href={`?language=${item}`}
          className={classNames({ "text-red-400": language === item })}
        >
          {item}
        </a>
      ))}
    </div>
  );
};
