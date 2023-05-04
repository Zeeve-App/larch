import { Link } from "react-router-dom";

import { ReactComponent as IconArrowUp2 } from "src/assets/ArrowUp2.svg";

type CardProp = {
  cardTitle: string;
  cardLink: string;
  cardIcon: React.ReactElement;
  cardDescription: string;
  records: string;
};

export default function Card({
  cardTitle,
  cardLink,
  cardIcon,
  cardDescription,
  records,
}: CardProp) {
  return (
    <div className="w-full group gap-6 p-6 rounded-2xl border-2 border-gray-500 bg-larch-dark_2 hover:bg-larch-dark">
      <Link to={cardLink}>
        <div className="flex flex-col gap-3">
          {/* eslint-disable-next-line max-len */}
          <div className="flex items-start justify-between">
            <div className="flex gap-5 items-center">
              <div className="w-20 h-20 items-center flex justify-center content-center border-2 border-gray-500 rounded-2xl border-solid">
                {cardIcon}
              </div>
              <div className="flex flex-col gap-1">

                <h4 className="text-white font-rubik leading-8 text-2xl font-bold">
                  {cardTitle}
                </h4>
                <span className="text-gradient font-semibold font-rubik text-lg leading-8">
                  Records: {records || "N/A"}
                </span>
              </div>
            </div>
            <IconArrowUp2 className="text-white hidden group-hover:block w-10 h-10 rotate-45" />
          </div>

          <p className="text-white opacity-50 text-lg font-medium font-rubik leading-8">
            {cardDescription}
          </p>
        </div>
      </Link>
    </div>
  );
}
