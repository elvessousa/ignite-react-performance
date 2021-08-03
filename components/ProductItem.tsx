type Product = {
  id: number;
  price: number;
  title: string;
};

export function ProductItem({ price, title }: Product) {
  return (
    <article>
      <h4>{title}</h4>
      <p>
        <strong>Price: </strong>
        {price}
      </p>
    </article>
  );
}
