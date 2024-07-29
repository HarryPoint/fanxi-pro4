let ob = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
  });

  

const LazyImg = (props) => {
    const {src} = props
    return <img data-src={}/>
}