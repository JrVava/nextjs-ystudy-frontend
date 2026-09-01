import { getCMSPageContent } from "@/services/cms.service";
import Link from "next/link";
import React from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";

export default async function PrivacyPolicy() {
    const data = await getCMSPageContent("privacy-policy");

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
                            <div className="container"><span className="eyebrow">{data?.section_1?.badge}</span>
                                <h1>{data?.section_1?.title}</h1>
                                <p>{data?.section_1?.description}</p><small>Last updated: {data?.createdAt ? new Date(data.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</small>
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
                                        {
                                            data?.section_4?.pointers.map((item: any, key: number) => (
                                                <li key={key} dangerouslySetInnerHTML={{ __html: item || '' }} />
                                            ))
                                        }
                                    </ul>
                                    <p><strong>{data?.section_4?.description2[0]?.title}</strong> {data?.section_4?.description2[0]?.description}</p>
                                </div>
                            ) : null
                        }
                        {
                            data?.section_5?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_5?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_5?.description1 || '' }} />
                                    <ul>
                                        {
                                            data?.section_5?.pointers.map((item: any, key: number) => (
                                                <li key={key} dangerouslySetInnerHTML={{ __html: item || '' }} />
                                            ))
                                        }
                                    </ul>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_5?.description2 || '' }} />
                                </div>
                            ) : null
                        }
                        {
                            data?.section_6?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_6?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_6?.description || '' }} />
                                    <ul>
                                        {
                                            data?.section_6?.pointers.map((item: any, key: number) => (
                                                <li key={key} dangerouslySetInnerHTML={{ __html: item || '' }} />
                                            ))
                                        }
                                    </ul>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_6?.description2 || '' }} />
                                </div>
                            ) : null
                        }

                        {
                            data?.section_7?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_7?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_7?.description || '' }} />
                                </div>
                            ) : null
                        }

                        {
                            data?.section_8?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_8?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_8?.description1 || '' }} />
                                    <ul>
                                        {
                                            data?.section_8?.pointers.map((item: any, key: number) => (
                                                <li key={key} dangerouslySetInnerHTML={{ __html: item || '' }} />
                                            ))
                                        }
                                    </ul>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_8?.description2 || '' }} />
                                </div>
                            ) : null
                        }

                        {
                            data?.section_9?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_9?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_9?.description1 || '' }} />
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_9?.description2 || '' }} />
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

                        {
                            data?.section_11?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_11?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_11?.description || '' }} />
                                </div>
                            ) : null
                        }

                        {
                            data?.section_12?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_12?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_12?.description || '' }} />
                                </div>
                            ) : null
                        }

                        {
                            data?.section_13?.status === true ? (
                                <div className="legal-card">
                                    <h2>{data?.section_13?.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_13?.description1 || '' }} />
                                    <p dangerouslySetInnerHTML={{ __html: data?.section_13?.description2 || '' }} />
                                </div>
                            ) : null
                        }
                    </div>
                </section>
            </main>
        </SiteLayout>
    );
}
