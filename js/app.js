function MyApp() {
  return (
    <div>
      <Header />
      <List />
    </div>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);
