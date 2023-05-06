import './loader.css';

type LoaderProps = {
  text?: string;
}

export default function Loader({ text }: LoaderProps) {
  return (
    <div className='loading' role='status'>
      <span className='relative text-larch-pink top-14 right-14 font-bold text-2xl'>{text ? text : "Processing"}...</span>
    </div>
  );
}
