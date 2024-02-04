import Image from "next/image";
import heroImg from "../../public/assets/images/hero.png";

export default function Page() {
  return (
    <section className="flex flex-col w-full items-center">
      <div>
        <Image
          className="w-[300px] md:w-[400px] lg:w-[510px]"
          alt="Tarefas+"
          src={heroImg}
          priority
        />
      </div>
      <div className="my-10 text-center">
        <h1 className="text-1xl font-bold text-white leading-normal md:text-2xl lg:text-3xl">
          Sistema feito para você organizar <br /> seus estudo e tarefas
        </h1>
      </div>
      <div className="text-center flex">
        <div className="flex flex-col justify-center w-fit min-w-[130px] h-[40px] text-[12px] mx-2 bg-white rounded-xl font-medium
                md:min-w-[160px] md:h-[45px] md:text-[14px] lg:min-w[200px] lg:h-[50px] lg:text-[16px]
                hover:scale-105 transition-all duration-300 ease-in-out">
          <span>+ 7mil posts</span>
        </div>
        <div className="flex flex-col justify-center w-fit min-w-[130px] h-[40px] text-[12px] mx-2 bg-white rounded-xl font-medium
                md:min-w-[160px] md:h-[45px] md:text-[14px] lg:min-w[200px] lg:h-[50px] lg:text-[16px]
                hover:scale-105 transition-all duration-300 ease-in-out">
          <span>+ 1mil comentários</span>
        </div>
      </div>
    </section>
  );
}