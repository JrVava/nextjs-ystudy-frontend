import { getCMSPageContent } from "@/services/cms.service";
import Link from "next/link";
import React from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";

export default async function CookiesPolicy() {
    const data = await getCMSPageContent("cookies-policy");
    console.log("data?.section_8", data?.section_8);
    if (!data) {
        return (
            <SiteLayout>
                <div style={{ padding: "4rem", textAlign: "center", color: "var(--muted)" }}>
                    <h2>Application Details Not Found</h2>
                    <p>We couldn&apos;t retrieve the application guidance at this time.</p>
                    <Link href="/" className="btn btn-blue" style={{ marginTop: "1rem" }}>Go to Home</Link>
                </div>
            </SiteLayout>
        );
    }
    return (
        <SiteLayout>
            <main>
                {
                    data?.section_1?.status === true ? (
                        <section className="legal-hero">
                            <div className="container">
                                <span className="eyebrow">{data?.section_1?.badge}</span>
                                <h1>{data?.section_1?.title}</h1>
                                <p>{data?.section_1?.description}</p>
                                <small>Last updated: {data?.createdAt ? new Date(data.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</small>
                            </div>
                        </section>
                    ) : null
                }
                <section className="legal-main">
                    <div className="container legal-wrap">
                        {
                            data?.section_2?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_2?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_2?.description1 || '' }} />
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_2?.description2 || '' }} />
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_2?.description3 || '' }} />
                                </div>
                            ) : null
                        }
                        {
                            data?.section_3?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_3?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_3?.description1 || '' }} />
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_3?.description2 || '' }} />
                                </div>
                            ) : null
                        }

                        {
                            data?.section_4?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_4?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_4?.description1 || '' }} />
                                    <ul>
                                        <li><p dangerouslySetInnerHTML={{ __html: data?.section_4?.description2 || '' }} /></li>
                                        <li><p dangerouslySetInnerHTML={{ __html: data?.section_4?.description3 || '' }} /></li>
                                        <li><p dangerouslySetInnerHTML={{ __html: data?.section_4?.description4 || '' }} /></li>
                                    </ul>
                                </div>
                            ) : null
                        }

                        {
                            data?.section_5?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_5?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_5?.description || '' }} />
                                </div>
                            ) : null
                        }

                        {
                            data?.section_6?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_6?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_6?.description1 || '' }} />
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_6?.description2 || '' }} />
                                </div>
                            ) : null
                        }

                        {
                            data?.section_7?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_7?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_7?.description1 || '' }} />
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_7?.description2 || '' }} />
                                </div>
                            ) : null
                        }

                        {
                            data?.section_8?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_8?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_8?.description1 || '' }} />
                                    <ul>
                                        <li><p dangerouslySetInnerHTML={{ __html: data?.section_8?.description2 || '' }} /></li>
                                        <li><p dangerouslySetInnerHTML={{ __html: data?.section_8?.description3 || '' }} /></li>
                                        <li><p dangerouslySetInnerHTML={{ __html: data?.section_8?.description4 || '' }} /></li>
                                    </ul>
                                </div>
                            ) : null
                        }

                        {
                            data?.section_9?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_9?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_9?.description || '' }} />
                                </div>
                            ) : null
                        }

                        {
                            data?.section_10?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_10?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_10?.description || '' }} />
                                </div>
                            ) : null
                        }
                    </div>
                </section>
            </main>
        </SiteLayout>
    );
}