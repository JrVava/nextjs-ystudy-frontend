import { encrypt, decrypt } from "@/lib/crypto";
import { CMSPageData } from "@/types/cms";
import fallbackHome from "@/content/fallbacks/home.json";
import fallbackDegrees from "@/content/fallbacks/degrees.json";
import fallbackStudyLocations from "@/content/fallbacks/study-locations.json";
import fallbackFoundationYear from "@/content/fallbacks/qualifications/foundation-year.json";
import fallbackHND from "@/content/fallbacks/qualifications/hnd.json";
import fallbackCertHE from "@/content/fallbacks/qualifications/certhe.json";
import fallbackFoundationDegree from "@/content/fallbacks/qualifications/foundation-degree.json";
import fallbackHNC from "@/content/fallbacks/qualifications/hnc.json";
import fallbackMasters from "@/content/fallbacks/qualifications/masters.json";
import fallbackTopUpDegree from "@/content/fallbacks/qualifications/top-up-degree.json";
import fallbackStudySubjects from "@/content/fallbacks/study-subjects.json";
import fallbackStudyRoutes from "@/content/fallbacks/study-routes.json";
import fallbackPolishCommunity from "@/content/fallbacks/guides/polish-community.json";
import fallbackBusinessCourse from "@/content/fallbacks/course/business-management-ba.json";
import fallbackComputingCourse from "@/content/fallbacks/course/computing-cybersecurity-bsc.json";
import fallbackHealthCourse from "@/content/fallbacks/course/health-social-care-ba.json";
import fallbackTools from "@/content/fallbacks/tools/tools.json";
import fallbackPersonalStatement from "@/content/fallbacks/tools/personal-statement.json";
import fallbackSalaryChecker from "@/content/fallbacks/tools/salary-checker.json";
import fallbackEligibilityChecker from "@/content/fallbacks/tools/eligibility-checker.json";
import fallbackCareerQuiz from "@/content/fallbacks/tools/career-quiz.json";
import fallbackCvBuilder from "@/content/fallbacks/tools/cv-builder.json";
import fallbackFundingChecker from "@/content/fallbacks/tools/funding-checker.json";
import fallbackEnglishTest from "@/content/fallbacks/tools/english-test.json";
import fallbackDegreeMatchFinder from "@/content/fallbacks/tools/degree-match-finder.json";
import fallbackFunding from "@/content/fallbacks/funding.json";
import fallbackMoney from "@/content/fallbacks/money.json";
import fallbackChildcareGrant from "@/content/fallbacks/funding/childcare-grant.json";
import fallbackGrants from "@/content/fallbacks/funding/grants.json";
import fallbackDSA from "@/content/fallbacks/funding/disabled-students-allowance.json";
import fallbackTuitionFeeLoan from "@/content/fallbacks/funding/tuition-fee-loan.json";
import fallbackMaintenanceLoan from "@/content/fallbacks/funding/maintenance-loan.json";
import fallbackStudentFinance from "@/content/fallbacks/guides/student-finance.json";
import fallbackGuidesHub from "@/content/fallbacks/guides/hub.json";
import fallbackUniversityRoutes from "@/content/fallbacks/guides/university-routes.json";
import fallbackCareerChange from "@/content/fallbacks/guides/career-change.json";
import fallbackNews from "@/content/fallbacks/guides/news.json";
import fallbackWhyYStudy from "@/content/fallbacks/why-ystudy.json";
import fallbackCareersSalaries from "@/content/fallbacks/guides/careers-salaries.json";
import fallbackFoundationYears from "@/content/fallbacks/guides/foundation-years.json";
import fallbackMatureStudents from "@/content/fallbacks/guides/mature-students.json";
import fallbackOnlineDegrees from "@/content/fallbacks/guides/online-degrees.json";
import fallbackSettledStatus from "@/content/fallbacks/guides/settled-status.json";
import fallbackHowGuidanceWorks from "@/content/fallbacks/how-guidance-works.json";
import fallbackSuccessStories from "@/content/fallbacks/success-stories.json";
import fallbackFaq from "@/content/fallbacks/faq.json";
import api from "@/lib/api";


export async function getCMSPageContent(pageName: string): Promise<CMSPageData | null> {
  if (!pageName || typeof pageName !== "string") {
    console.warn(`[cms.service] getCMSPageContent: invalid pageName '${pageName}'`);
    return null;
  }
  try {
    const encryptedBody = encrypt({ slug: pageName });
    const res = await api.post("/frontend/cms", { data: encryptedBody });

    const json = res.data;
    if (!json || !json.data) {
      console.warn(`[cms.service] CMS page '${pageName}' returned empty data.`);
      return getFallbackData(pageName);
    }

    const decrypted = decrypt(json.data);
    if (decrypted && decrypted.success && decrypted.data) {
      return decrypted.data;
    }

    console.warn(`[cms.service] CMS decryption failed or returned unsuccessful status.`);
    return getFallbackData(pageName);
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.warn(`[cms.service] CMS page not found for pageName '${pageName}' (Status: 404).`);
    } else {
      console.error(`[cms.service] Error calling CMS API for page '${pageName}':`, error.message || error);
    }
    return getFallbackData(pageName);
  }
}

function getFallbackData(pageName: string): CMSPageData | null {
  if (!pageName || typeof pageName !== "string") {
    return null;
  }
  console.info(`[cms.service] Using static fallback data for page: ${pageName}`);
  const slug = pageName.toLowerCase().trim();

  if (slug === "funding") {
    return fallbackFunding as unknown as CMSPageData;
  }
  if (slug === "money") {
    return fallbackMoney as unknown as CMSPageData;
  }
  if (slug === "childcare-grant") {
    return fallbackChildcareGrant as unknown as CMSPageData;
  }
  if (slug === "grants" || slug === "grants-support") {
    return fallbackGrants as unknown as CMSPageData;
  }
  if (slug === "disabled-students-allowance" || slug === "disabled-students-allowance-guide" || slug === "dsa") {
    return fallbackDSA as unknown as CMSPageData;
  }
  if (slug === "tuition-fee-loan") {
    return fallbackTuitionFeeLoan as unknown as CMSPageData;
  }
  if (slug === "maintenance-loan") {
    return fallbackMaintenanceLoan as unknown as CMSPageData;
  }
  if (slug === "student-finance") {
    return fallbackStudentFinance as unknown as CMSPageData;
  }
  if (slug === "guides" || slug === "guides-hub" || slug === "resources" || slug === "resources-hub") {
    return fallbackGuidesHub as unknown as CMSPageData;
  }
  if (slug === "university-routes" || slug === "university-routes-guide") {
    return fallbackUniversityRoutes as unknown as CMSPageData;
  }
  if (slug === "career-change" || slug === "career-change-guide") {
    return fallbackCareerChange as unknown as CMSPageData;
  }
  if (slug === "news" || slug === "news-guides" || slug === "news-updates") {
    return fallbackNews as unknown as CMSPageData;
  }
  if (slug === "why-ystudy" || slug === "why-use-ystudy") {
    return fallbackWhyYStudy as unknown as CMSPageData;
  }
  if (slug === "careers-salaries" || slug === "careers-salaries-guide") {
    return fallbackCareersSalaries as unknown as CMSPageData;
  }
  if (slug === "foundation-years" || slug === "foundation-years-guide") {
    return fallbackFoundationYears as unknown as CMSPageData;
  }
  if (slug === "mature-students" || slug === "mature-students-guide") {
    return fallbackMatureStudents as unknown as CMSPageData;
  }
  if (slug === "online-degrees" || slug === "online-degrees-guide") {
    return fallbackOnlineDegrees as unknown as CMSPageData;
  }
  if (slug === "settled-status" || slug === "settled-status-guide") {
    return fallbackSettledStatus as unknown as CMSPageData;
  }
  if (slug === "how-guidance-works" || slug === "how-guidance-works-page") {
    return fallbackHowGuidanceWorks as unknown as CMSPageData;
  }
  if (slug === "success-stories" || slug === "success-story") {
    return fallbackSuccessStories as unknown as CMSPageData;
  }
  if (slug === "faq" || slug === "faqs") {
    return fallbackFaq as unknown as CMSPageData;
  }


  if (slug === "home") {
    return fallbackHome as unknown as CMSPageData;
  }
  if (slug === "degrees") {
    return fallbackDegrees as unknown as CMSPageData;
  }
  if (slug === "study-locations") {
    return fallbackStudyLocations as unknown as CMSPageData;
  }
  if (slug === "study-subjects" || slug === "subjects") {
    return fallbackStudySubjects as unknown as CMSPageData;
  }
  if (slug === "study-routes" || slug === "routes") {
    return fallbackStudyRoutes as unknown as CMSPageData;
  }
  if (slug === "polish-community" || slug === "polish-community-guide") {
    return fallbackPolishCommunity as unknown as CMSPageData;
  }
  if (slug === "foundation-year") {
    return fallbackFoundationYear as unknown as CMSPageData;
  }
  if (slug === "hnd") {
    return fallbackHND as unknown as CMSPageData;
  }
  if (slug === "certhe" || slug === "certificate-of-higher-education") {
    return fallbackCertHE as unknown as CMSPageData;
  }
  if (slug === "hnc") {
    return fallbackHNC as unknown as CMSPageData;
  }
  if (slug === "foundation-degree") {
    return fallbackFoundationDegree as unknown as CMSPageData;
  }
  if (slug === "top-up-degree") {
    return fallbackTopUpDegree as unknown as CMSPageData;
  }
  if (slug === "masters-degree" || slug === "masters") {
    return fallbackMasters as unknown as CMSPageData;
  }
  if (slug === "business" || slug === "business-management-ba") {
    return fallbackBusinessCourse as unknown as CMSPageData;
  }
  if (slug === "computing" || slug === "computing-cybersecurity-bsc") {
    return fallbackComputingCourse as unknown as CMSPageData;
  }
  if (slug === "health" || slug === "health-social-care-ba") {
    return fallbackHealthCourse as unknown as CMSPageData;
  }
  if (slug === "tools") {
    return fallbackTools as unknown as CMSPageData;
  }
  if (slug === "personal-statement" || slug === "personal-statement-calculator") {
    return fallbackPersonalStatement as unknown as CMSPageData;
  }
  if (slug === "salary-checker") {
    return fallbackSalaryChecker as unknown as CMSPageData;
  }
  if (slug === "eligibility-checker") {
    return fallbackEligibilityChecker as unknown as CMSPageData;
  }
  if (slug === "career-quiz") {
    return fallbackCareerQuiz as unknown as CMSPageData;
  }
  if (slug === "cv-builder") {
    return fallbackCvBuilder as unknown as CMSPageData;
  }
  if (slug === "funding-checker" || slug === "finance-calculator") {
    return fallbackFundingChecker as unknown as CMSPageData;
  }
  if (slug === "english-test" || slug === "english-level-checker") {
    return fallbackEnglishTest as unknown as CMSPageData;
  }
  if (slug === "degree-match-finder" || slug === "degree-match") {
    return fallbackDegreeMatchFinder as unknown as CMSPageData;
  }

  return null;
}

