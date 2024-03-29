import { MdBrightness1 } from "react-icons/md";
import cx from "classnames"

interface ExperienceData {
    startDate: string;
    endDate: string | null;
    title: string;
    description: string | null;
}

const data : ExperienceData[] = [
    {
        startDate: "24.03",
        endDate: null,
        title: "소프트웨어 마에스트로 15기",
        description: null
    },
    {
        startDate: "22-12",
        endDate: "23.06",
        title: "백엔드 엔지니어 인턴 @유니로보틱스",
        description:
            "- 장비 데이터 조회 REST API 구현 및 성능 개설과 미용 절감\n" +
            "- IoT 장비 데이터 파이프라인 개발 및 데이터 유실 문제 해결\n" +
            "- 모니터링을 통한 문제 발견 및 개발 방지 대책 마련"
    },
    {
        startDate: "22-06",
        endDate: "23.08",
        title: "태커 실리콘밸리 2022 여름 부트캠프",
        description:
            "- 사용자가 그린 그림을 AI가 분석하여 제시어와 얼마나 유사한지 평가하는 서비스\n" +
            "- 사용자가 그림을 그릴 수 있는 캔버스 및 그림을 AI가 분석할 수 있는 형태로 변형하여 서버로 전송하는 기능 구현\n" +
            "- AI의 분석 결과를 rechart 라이브러리를 사용하여 그래프로 시각화"
    }

]
export default function ExperienceSection() {
    return (
        <div
            className="bg-white w-[800px] min-h-[200px] mr-32 rounded-xl flex flex-col flex-1 justify-start">
            <div className="text-xl font-bold items-start ml-5 mt-5">#Experience</div>

            <ul className="timeline timeline-snap-icon timeline-compact timeline-vertical px-10 py-10">
                {data.map((item, index) => (
                    <li key={index}>
                        {index !== 0 && <hr/>} {/* 첫 번째 요소가 아닐 때만 <hr/> 렌더링 */}
                        <div className="timeline-middle">
                            <MdBrightness1 className="h-5 w-5"/>
                        </div>
                        <div
                            className="timeline-end md:text-start mb-10" style={{whiteSpace: "pre-wrap"}}>
                            <time className="font-mono italic">
                                {item.startDate} - {item.endDate ? item.endDate : "진행중"}
                            </time>
                            <div className="text-lg font-black">{item.title}</div>
                            <div
                                className={cx(item.description && "mt-3 ml-3 bg-neutral-content/30 px-5 py-5 rounded-xl")}>
                                {item.description}
                            </div>
                        </div>
                        <hr/>
                    </li>
                ))}
            </ul>

        </div>

    )
}