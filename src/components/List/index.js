const Item = (props) => {
  const { index, data } = props;
  return (
    <div className="w-1/2 md:w-1/3 lg:w-1/4 p-2 transition-all">
      <div className="bg-gray-200">
        <h5 className="text-center py-4 leading-9">#{index}</h5>
        <LazyImg
          className="lazyload w-1/2 aspect-square mx-auto bg-cover bg-center"
          src="./assets/loading.gif"
          dataSrc={data.owner.avatar_url}
        />
        <h6 className="text-lg text-center text-red-700">{data.name}</h6>
        <div className="p-8">
          <div className="text-nowrap">
            <Icon type="icon-user" className="text-yellow-500 mr-1" />
            <span>{data.name}</span>
          </div>
          <div className="">
            <Icon type="icon-star" className="text-yellow-400 mr-1" />
            <span>{data.stargazers_count} stars</span>
          </div>
          <div className="">
            <Icon type="icon-fork" className="text-sky-600 mr-1" />
            <span>{data.forks_count} forks</span>
          </div>
          <div>
            <Icon type="icon-error" className="text-red-700 mr-1" />
            <span>{data.open_issues} open issues</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const fetchData = async ({ page, pageSize, language } = {}) => {
  return api.getRepositories({
    page: page ?? 1,
    per_page: pageSize ?? 10,
    q: `stars:>1${language ? ` language:${language}` : ""}`,
    sort: "stars",
    order: "desc",
    type: "Repositories",
  });
  // return await fetch(
  //   "https://api.github.com/search/repositories?q=stars%3A%3E1&sort=stars&order=desc&type=Repositories&page=1&per_page=10"
  // ).then((data) => data.json());
};

const List = (props) => {
  const { language } = props;
  const loaderRef = React.useRef(null);
  const [list, setList] = React.useState([]);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    fetchData({
      page,
      pageSize: 10,
      language,
    }).then(({ data }) => {
      setList([...list, ...data.items]);
    });
  }, [page, language]);

  React.useEffect(() => {
    let ob = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
    });
    if (loaderRef.current) {
      ob.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        ob.unobserve(loaderRef.current);
      }
    };
  }, []);
  return (
    <div className="container mx-auto ">
      <div>{language}</div>
      <div className="min-h-svh">
        <div className="flex flex-wrap justify-around">
          {list.map((item, index) => (
            <Item key={`${item.id}_${index}`} data={item} index={index} />
          ))}
        </div>
      </div>
      <div className="flex justify-center h-12 items-center">
        <div ref={loaderRef} className="loader"></div>
      </div>
    </div>
  );
};
