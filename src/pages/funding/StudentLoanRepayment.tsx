import React from "react";
import Banner from "@/components/ui/Banner";
import RepaymentEstimator from "@/components/widgets/RepaymentEstimator";
import { RepaymentThresholdsPlan } from "@/services";

const fdhBtnBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "56px",
    padding: "0 28px",
    borderRadius: "999px",
    fontFamily: "var(--df)",
    fontWeight: 800,
    fontSize: "16px",
    border: "2px solid transparent",
    cursor: "pointer",
    textDecoration: "none",
};

interface InfoCard {
    icon: string;
    title: string;
    description: string;
    badge: string;
    link: string;
    linkName: string;
}

interface StudentLoanRepaymentProps {
    data?: any;
    repaymentPlan?: RepaymentThresholdsPlan[] | null;
}
export function StudentLoanRepayment({ data, repaymentPlan }: StudentLoanRepaymentProps) {
    const activePlan = Array.isArray(repaymentPlan)
        ? (repaymentPlan.length > 0 ? repaymentPlan[0] : null)
        : repaymentPlan;

    const tableColumns = activePlan?.columns || [];
    const tableRows = activePlan?.rows || [];

    return (<div className="qualification-page funding-sub-page">
        {/* HERO BANNER */}
        <Banner
            slug="student-loan-repayment"
            fallbackBadgeText="★ Childcare Grant · 2026/27"
            fallbackTitle="Studying with kids? This helps."
            fallbackDescription="Covers up to 85% of registered childcare while you study — paid termly, and it doesn't reduce your maintenance loan."
            fallbackBgImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2000&q=85"
            fallbackRightCard={{
                layoutType: "list-items",
                title: "Per week · non-repayable",
                items: [
                    { value: "£199.62", description: "1 child" },
                    { value: "£342.24", description: "2+ children" }
                ]
            }}
        >
            <div className="fdhrow" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "26px" }}>
                <a className="fdhbtn white" href="#repayment-estimator" style={{ ...fdhBtnBase, background: "#fff", color: "#071126" }}>Undergraduate calculator →</a>
                <a className="fdhbtn ghost" href="#repayment-estimator" style={{ ...fdhBtnBase, background: "rgba(255,255,255,0.15)", color: "#fff", borderColor: "rgba(255,255,255,0.45)" }}>Postgraduate calculator</a>
            </div>
        </Banner>
        {
            data?.section_2 && data?.section_2?.status &&
            <section className="section white">
                <div className="container">
                    <div className="info-card" >
                        <span className="kicker">{data?.section_2?.badge}</span>
                        <h2>{data?.section_2?.title}</h2>
                        <div className="key-fact"><strong>{data?.section_2?.subTitle}</strong>
                            <p>{data?.section_2?.description1}</p>
                        </div>
                        <p>{data?.section_2?.description2}</p>
                    </div>
                </div>
            </section>
        }

        <section className="ysrep-section" id="repayment-estimator">
            <div className="ysrep-wrap">
                {
                    data?.section_3 && data?.section_3?.status &&
                    <div>
                        <p className="ysrep-eyebrow">{data?.section_3?.badge}</p>
                        <h2>{data?.section_3?.title}</h2>
                        <p className="ysrep-lead">{data?.section_3?.description}</p>
                        <RepaymentEstimator />
                    </div>
                }
                {
                    data?.section_4 && data?.section_4?.status &&
                    <div className="ysrep-disclosure">
                        <h3>{data?.section_4?.title}</h3>
                        <p>{data?.section_4?.description1}</p>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: data?.section_4?.description2 || "",
                            }}
                        />
                    </div>
                }
            </div>
        </section>

        <section className="section white" id="when-repaying">
            <div className="container">
                {
                    data?.section_5 && data?.section_5?.status &&
                    <div>
                        <div className="title-row">
                            <div><span className="kicker">{data?.section_5?.badge}</span>
                                <h2>{data?.section_5?.title}</h2>
                            </div>
                            <p>{data?.section_5?.description}</p>
                        </div>
                        <div className="guide-grid guide-carousel">
                            {data?.section_5?.cards?.map((item: InfoCard, index: number) => (
                                <div className="info-card" key={index}>
                                    <div className="icon">{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                {
                    data?.section_6 && data?.section_6?.status && (
                        <>
                            <div style={{ marginTop: "26px" }}>
                                <h3 style={{ fontWeight: "900", color: "#102033", margin: "0 0 6px", fontSize: "20px" }}>
                                    {data?.section_6?.title}
                                </h3>
                                <p className="rc-compliance-note">{data?.section_6?.description1}</p>
                                <p style={{ color: "#52637a", fontWeight: "600", fontSize: "13.5px", margin: "0 0 14px" }}>
                                    {data?.section_6?.description2}
                                </p>
                                {tableColumns.length > 0 && tableRows.length > 0 && (
                                    <table className="ds-data-table">
                                        <thead>
                                            <tr>
                                                {tableColumns.map((col, idx) => (
                                                    <th key={col.key || col.id || idx}>{col.header}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableRows.map((row, rIdx) => (
                                                <tr key={row.id || rIdx} style={{ fontWeight: row.isHighlighted ? 850 : "normal" }}>
                                                    {tableColumns.map((col, cIdx) => {
                                                        const val = row[col.key] ?? (Array.isArray(row.cells) ? row.cells[cIdx] : "") ?? "";
                                                        return (
                                                            <td
                                                                key={col.key || cIdx}
                                                                style={{ fontWeight: row.isHighlighted ? 850 : "normal" }}
                                                            >
                                                                {val}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                <p style={{ marginTop: "12px", fontSize: "13px", color: "#52637a", fontWeight: "700" }}>
                                    {data?.section_6?.description3}
                                    <a
                                        href="https://www.gov.uk/repaying-your-student-loan/which-repayment-plan-you-are-on" rel="noopener"
                                        style={{ color: "#1263ff", fontWeight: "900" }} target="_blank">Check on GOV.UK →</a></p>
                            </div>
                            <div className="guide-grid guide-carousel" style={{ marginTop: "26px" }}>
                                {data?.section_6?.cards?.map((item: InfoCard, index: number) => (
                                    <div className="info-card" key={index}>
                                        <div className="icon">{item.icon}</div>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                {
                    data?.section_7 && data?.section_7?.status &&
                    <a className="gov-card" href={data?.section_7?.link} rel="noopener"
                        target="_blank">
                        <span className="crest">GOV.UK</span>
                        <span className="gt">
                            <strong>{data?.section_7?.title}</strong>
                            <span>{data?.section_7?.description}</span>
                        </span>
                        <span className="ga">→</span>
                    </a>
                }
            </div>
        </section >

        <section className="section" id="how">
            <div className="container">
                {
                    data?.section_8 && data?.section_8?.status &&
                    <div>
                        <div className="title-row">
                            <div>
                                <span className="kicker">{data?.section_8?.badge}</span>
                                <h2>{data?.section_8?.title}</h2>
                            </div>
                            <p>{data?.section_8?.description}</p>
                        </div>
                        <div className="guide-grid guide-carousel">
                            {
                                data?.section_8?.cards?.map((item: InfoCard, key: number) => (
                                    <div className="info-card" key={key}>
                                        <div className="icon">{item?.icon}</div>
                                        <h3>{item?.title}</h3>
                                        <p>{item?.description}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
                {
                    data?.section_9 && data?.section_9?.status &&
                    <a className="gov-card" href={data?.section_9?.link} rel="noopener"
                        target="_blank">
                        <span className="crest">GOV.UK</span>
                        <span className="gt">
                            <strong>
                                {data?.section_9?.title}
                            </strong>
                            <span>
                                {data?.section_9?.description}
                            </span>
                        </span>
                        <span className="ga">→ </span>
                    </a>
                }
            </div>
        </section>

        <section className="section white" id="obligations">
            <div className="container">
                {
                    data?.section_10 && data?.section_10?.status &&
                    <div>
                        <div className="title-row">
                            <div><span className="kicker">{data?.section_10?.badge}</span>
                                <h2>{data?.section_10?.title}</h2>
                            </div>
                            <p>{data?.section_10?.description}</p>
                        </div>
                        <div className="guide-grid guide-carousel">
                            {
                                data?.section_10?.cards?.map((item: InfoCard, key: number) => (
                                    <div className="info-card" key={key}>
                                        <div className="icon">{item?.icon}</div>
                                        <h3>{item?.title}</h3>
                                        <p>{item?.description}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
                {
                    data?.section_11 && data?.section_11?.status &&
                    <a className="gov-card" href={data?.section_11?.link} rel="noopener" target="_blank">
                        <span className="crest">GOV.UK</span>
                        <span className="gt">
                            <strong>{data?.section_11?.title}</strong>
                            <span>
                                {data?.section_11?.description}
                            </span>
                        </span>
                        <span className="ga">→</span>
                    </a>
                }
            </div>
        </section>

        <section className="section" id="after-grad">
            <div className="container">
                {
                    data?.section_12 && data?.section_12?.status &&
                    <div>
                        <div className="title-row">
                            <div><span className="kicker">{data?.section_12?.badge}</span>
                                <h2>{data?.section_12?.title}</h2>
                            </div>
                            <p>{data?.section_12?.description}</p>
                        </div>
                        <div className="guide-grid guide-carousel">
                            {
                                data?.section_10?.cards?.map((item: InfoCard, key: number) => (
                                    <div className="info-card" key={key}>
                                        <div className="icon">{item?.icon}</div>
                                        <h3>{item?.title}</h3>
                                        <p>{item?.description}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
                {
                    data?.section_13 && data?.section_13?.status &&
                    <a className="gov-card" href={data?.section_13?.link} rel="noopener" target="_blank">
                        <span className="crest">GOV.UK</span>
                        <span className="gt">
                            <strong>{data?.section_13?.title}</strong>
                            <span>
                                {data?.section_13?.description}
                            </span>
                        </span>
                        <span className="ga">→</span>
                    </a>
                }
            </div>
        </section>

        <section className="rc-additions" id="repayment-obligations-guide">
            <div className="rc-additions-inner">
                {
                    data?.section_14 && data?.section_14?.status &&
                    <div>
                        <p className="rc-eyebrow">{data?.section_14?.badge}</p>
                        <h2>{data?.section_14?.title}</h2>
                        <p className="rc-intro">{data?.section_14?.description}</p>
                        <div className="rc-guide-grid">
                            {
                                data?.section_14?.cards?.map((item: InfoCard, key: number) => (
                                    <article className="rc-guide-card" key={key}>
                                        <span className="rc-guide-icon">{item?.badge}</span>
                                        <h3>{item?.title}</h3>
                                        <p>{item?.description}</p>
                                        <a
                                            href={item?.link} rel="noopener" target="_blank">{item?.linkName}</a>
                                    </article>
                                ))
                            }
                        </div>
                    </div>
                }
                {
                    data?.section_15 && data?.section_15?.status &&
                    <div className="rc-guide-bottom">
                        <div>
                            <h3>{data?.section_15?.title}</h3>
                            <p>{data?.section_15?.description}</p>
                        </div>
                        <a className="rc-gov-button" href={data?.section_15?.link} rel="noopener" target="_blank">
                            {data?.section_15?.btnName}
                        </a>
                    </div>
                }
            </div>
        </section>

        <section className="ysrep-section" id="repayment-extra-guidance">
            <div className="ysrep-wrap">
                {
                    data?.section_16 && data?.section_16?.status &&
                    <div>
                        <p className="ysrep-eyebrow">{data?.section_16?.badge}</p>
                        <h2>{data?.section_16?.title}</h2>
                        <div className="rc-guide-grid">
                            {
                                data?.section_16?.cards?.map((item: InfoCard, key: number) => (
                                    <article className="rc-guide-card" key={key}>
                                        <h3>{item?.title}</h3>
                                        <p>{item?.description}</p>
                                        <a href={item?.link} rel="noopener noreferrer" target="_blank">
                                            {item?.linkName}
                                        </a>
                                    </article>
                                ))
                            }
                        </div>
                    </div>
                }

                {
                    data?.section_17 && data?.section_17?.status &&
                    <div className="ysrep-disclosure">
                        <h3>{data?.section_17?.title}</h3>
                        <p>{data?.section_17?.description}</p>
                        <p>
                            {
                                data?.section_17?.cards?.map((item: InfoCard, key: number) => (
                                    <a href={item?.link} rel="noopener noreferrer" target="_blank" key={key}>
                                        {item?.linkName}
                                    </a>
                                ))
                            }
                        </p>
                    </div>
                }
            </div>
        </section>

        <section className="section white" id="truth">
            <div className="container">
                {
                    data?.section_18 && data?.section_18?.status &&
                    <div className="info-card" style={{ minHeight: "0" }}>
                        <span className="kicker">{data?.section_18?.badge}</span>
                        <h2>{data?.section_18?.title}</h2>
                        <p>{data?.section_18?.description1}</p>
                        <p>{data?.section_18?.description2}</p>
                    </div>
                }
                {
                    data?.section_19 && data?.section_19?.status &&
                    <div className="rc-disc">
                        <strong>{data?.section_19?.title}</strong>
                        {data?.section_19?.description}
                    </div>
                }
                {
                    data?.section_20 && data?.section_20?.status &&
                    <a className="gov-card" href={data?.section_20?.link} rel="noopener" target="_blank">
                        <span className="crest">GOV.UK</span>
                        <span className="gt">
                            <strong>
                                {data?.section_20?.title}
                            </strong>
                            <span>
                                {data?.section_20?.description}
                            </span>
                        </span>
                        <span className="ga">→</span>
                    </a>
                }
                {
                    data?.section_21 && data?.section_21?.status &&
                    <p className="rc-method">
                        {data?.section_21?.description}
                    </p>
                }
            </div>
        </section>

        <section className="rc-disclosure" id="how-estimates-work">
            <div className="rc-additions-inner">
                {
                    data?.section_22 && data?.section_22?.status &&
                    <div>
                        <p className="rc-eyebrow">{data?.section_22?.badge}</p>
                        <h2>{data?.section_22?.title}</h2>
                        <div className="rc-disclosure-grid">
                            {
                                data?.section_22?.cards?.map((item: InfoCard, key: number) => (
                                    <div key={key}>
                                        <h3>{item?.title}</h3>
                                        <p>{item?.description}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
                {
                    data?.section_23 && data?.section_23?.status &&
                    <div>
                        <p className="rc-independent"

                            dangerouslySetInnerHTML={{
                                __html: data?.section_23?.description || "",
                            }}
                        />
                        <p className="rc-updated">{data?.section_23?.badge}</p>
                    </div>
                }

            </div>
        </section >

        {
            data?.section_24 && data?.section_24?.status &&
            <section className="section">
                <div className="container">
                    <div className="final-cta" style={{
                        borderRadius: "52px",
                        background: `linear-gradient(135deg, rgba(6,17,38,0.94), rgba(6,17,38,0.55)), url(${data?.section_24?.fullImageUrl || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=85"}) center / cover`,
                        padding: "clamp(38px, 6vw, 84px)",
                        color: "#fff",
                        boxShadow: "var(--shadow-lg)",
                    }}><span className="kicker">{data?.section_24?.badge}</span>
                        <h2>{data?.section_24?.title}</h2>
                        <p>
                            {data?.section_24?.description}
                        </p>
                        <div className="btnrow"><a className="btn btn-orange" href="/lead/adviser-call">Book free adviser call →</a><a
                            className="btn btn-white" href="/tools/eligibility-checker">Check eligibility</a></div>
                    </div>
                </div>
            </section>
        }

    </div >);
}

export default StudentLoanRepayment;