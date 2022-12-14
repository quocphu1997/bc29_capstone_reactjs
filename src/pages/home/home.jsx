import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeCarousel from "../../components/carousel/home-carousel";
import MultipleRows from "../../components/libs/ReactSlick/MultipleRowslick";
import { useAsync } from "../../hooks/useAsync";
import {
  fetchManagerTheaterApi,
  fetchMovieListApi,
} from "../../services/quanlyphim";
import { SET_MOVIELIST, SET_MOVIETHEATER } from "../../store/types/name.type";
// import Film from "../../components/film/film";
import HomeMenu from "./home-menu";
import Loading from "../../components/loading/loading";

export default function Home() {
  const dispatch = useDispatch();
  const { movieInfo } = useSelector((state) => state.danhsachphimReducer);
  const { hethongRapChieu } = useSelector((state) => state.quanlyrapReducer);
  //
  const { state: movielistInfo } = useAsync({
    dependancies: [],
    service: () => fetchMovieListApi(),
  });
  //
  const { state: managerTheater } = useAsync({
    dependancies: [],
    service: () => fetchManagerTheaterApi(),
  });
  // console.log(movielistInfo);
  useEffect(() => {
    dispatch({
      type: SET_MOVIELIST,
      payload: movielistInfo,
    });
  }, [movielistInfo]);

  useEffect(() => {
    dispatch({
      type: SET_MOVIETHEATER,
      payload: managerTheater,
    });
  }, [managerTheater]);
  return (
    <div>
      <Loading />
      <div>
        <HomeCarousel />
      </div>
      <section className="py-6 sm:py-12 ">
        <div className="w-4/5 p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">
              Danh Sách Phim Chiếu Rạp 2022
            </h2>
          </div>
          {/* list phim */}
          <MultipleRows movieInfo={movieInfo} />
        </div>
      </section>
      <div style={{ margin: "100px 200px" }}>
        <HomeMenu hethongRapChieu={hethongRapChieu}  />
      </div>
    </div>
  );
}
