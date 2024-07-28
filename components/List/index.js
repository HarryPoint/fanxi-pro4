const Item = (props) => {
  const { index, data } = props;
  return (
    <div className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
      <div className="bg-gray-200">
        <h5 className="text-center py-4 leading-9">#{index}</h5>
        <img
          className="w-1/2 aspect-square mx-auto"
          src={data.owner.avatar_url}
        />
        <h6 className="text-lg text-center leading-9 text-red-700">
          {data.name}
        </h6>
        <div className="p-8">
          <div className="">
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

const fetchData = async () => {
  return await fetch(
    "https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories"
  ).then((data) => data.json());
};

const List = () => {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    fetchData().then((data) => {
      console.log(data);
      setList(data.items);
    });
  }, []);
  return (
    <div className="container mx-auto flex flex-wrap justify-around">
      {list.map((item, index) => (
        <Item key={item.id} data={item} index={index} />
      ))}
    </div>
  );
};
