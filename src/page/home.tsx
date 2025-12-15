import Banner from "./banner";
import Gallery from "./gallery";
export default function Home() {
  return (
    <main className="bg-whit text-white flex flex-row justify-evenly items-center gap-4 min-[350px]:p-0 md:p-8 h-screen">
      <Banner />
      <section className="flex flex-col items-center bg-white shadow-xl/50 rounded p-4 h-screen min-[350px]:hidden sm:hidden md:flex ">
        <Gallery isShow={false} />
        {/** isShow를 false로 설정함 이를 통해 home 페이지에서 불필요한 navigation을 랜더링 안하도록 함 
              해당 props는 Gallery ==> GalleryContainer  순으로 propsdrilling을 하며 이를 통해 navigation 랜더링 유무를 결정
              */}
      </section>
    </main>
  );
}
