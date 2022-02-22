package distribution;

//Distribution
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.logging.LogEntries;
import org.openqa.selenium.logging.LogEntry;
import org.openqa.selenium.logging.LogType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;


public class DistributionOverlayTemplate {
	public String username = "amit.singhsourcedigital";
	public String accesskey = "1CbrysxOc2bQ5XTkIhfV79zkKi5zcsswrSZ136sQu4yTxnuDF9";

	public static RemoteWebDriver driver = null;
	public String gridURL = "@hub.lambdatest.com/wd/hub";
	boolean status = false;

	@BeforeClass
	@Parameters(value={"browser","version","platform"})
	public void setUp(String browser, String version, String platform) throws Exception {
		DesiredCapabilities capabilities = new DesiredCapabilities();
		capabilities.setCapability("browserName", browser);
		capabilities.setCapability("version", version);
		capabilities.setCapability("platform", platform);// If this cap isn't specified, it will just get the any available one
		capabilities.setCapability("build", "Distribution");
		capabilities.setCapability("name", "DistributionOverlayTemplate");
		capabilities.setCapability("network", true);
		capabilities.setCapability("visual", true);
		capabilities.setCapability("video", true);
		capabilities.setCapability("console", true);
		
		try {
			driver = new RemoteWebDriver(new URL("https://" + username + ":" + accesskey + gridURL), capabilities);
		} catch (MalformedURLException e) {
			System.out.println("Invalid grid URL");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
	
	 @Test
	  public void screen01 () throws Exception {
	    driver.get("https://experience.sourcesync.io/695");

	  // iframe 01
	    driver.findElement(By.xpath("(//div[contains(text(),'iframe01')])[1]")).click();
		Thread.sleep(500);
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();    
	 // iframe 02
	    driver.findElement(By.xpath("(//div[contains(text(),'iframe02')])[1]")).click();
	    driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
	 // Action 01 
	    driver.findElement(By.xpath("(//div[contains(text(),'action01')])[1]")).click();
	    driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
	// Action 02
	    driver.findElement(By.xpath("(//div[contains(text(),'action02')])[1]")).click();
	    driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();

		 LogEntries entry = driver.manage().logs().get(LogType.BROWSER);
		 List<LogEntry> Logs = entry.getAll();

		 for(LogEntry Log : Logs) {
			 System.out.println("Logging the console Logs \n" +Log);

		 }
		 for(LogEntry log : Logs) {
			 System.out.println("Level is :  \n" + log.getLevel());
			 System.out.println("Message is :  \n" + log.getMessage());
		 }
	 }
	@Test
	public void screen02 () throws Exception {
		driver.get("https://experience.sourcesync.io/695");
		Thread.sleep(10000);
		// Image 01
		driver.findElement(By.xpath("(//div[contains(text(),'image01')])[1]")).click();
		Thread.sleep(500);
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
		// Image 02
		driver.findElement(By.xpath("(//div[contains(text(),'image02')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
		// Image 03
		driver.findElement(By.xpath("(//div[contains(text(),'image03')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
		// Image 04
		driver.findElement(By.xpath("(//div[contains(text(),'image04')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
	}
	@Test
	public void screen03 () throws Exception {
		driver.get("https://experience.sourcesync.io/695");
		Thread.sleep(20000);
		// markdown03
		driver.findElement(By.xpath("(//div[contains(text(),'markdown03')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
		// markdown02
		driver.findElement(By.xpath("(//div[contains(text(),'markdown02')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
		// markdown01
		driver.findElement(By.xpath("(//div[contains(text(),'markdown01')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
		// image05
		driver.findElement(By.xpath("(//div[contains(text(),'image05')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
	}
	@Test
	public void screen04 () throws Exception {
		driver.get("https://experience.sourcesync.io/695");
		Thread.sleep(30000);
		// markdown05
		driver.findElement(By.xpath("(//div[contains(text(),'markdown05')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
		// markdown07
		driver.findElement(By.xpath("(//div[contains(text(),'markdown07')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
		// markdown04
		driver.findElement(By.xpath("(//div[contains(text(),'markdown04')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
		// markdown07
		driver.findElement(By.xpath("(//div[contains(text(),'markdown06')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
	}
	@Test
	public void screen05 () throws Exception {
		driver.get("https://experience.sourcesync.io/695");
		Thread.sleep(40000);
		// social01
		driver.findElement(By.xpath("(//div[contains(text(),'social01')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
		// social03
		driver.findElement(By.xpath("(//div[contains(text(),'social03')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
		// social02
		driver.findElement(By.xpath("(//div[contains(text(),'social02')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
	}
	@Test
	public void screen06 () throws Exception {
		driver.get("https://experience.sourcesync.io/695");
		Thread.sleep(50000);
		// video01
		driver.findElement(By.xpath("(//div[contains(text(),'video01')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
		// video3
		driver.findElement(By.xpath("(//div[contains(text(),'video03')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
		// social04
		driver.findElement(By.xpath("(//div[contains(text(),'social04')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
		// video3
		driver.findElement(By.xpath("(//div[contains(text(),'video02')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
	}
	@Test
	public void screen07 () throws Exception {
		driver.get("https://experience.sourcesync.io/695");
		Thread.sleep(60000);
		// video05
		driver.findElement(By.xpath("(//div[contains(text(),'video05')])[1]")).click();
		Thread.sleep(500);
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
		// video04
		driver.findElement(By.xpath("(//div[contains(text(),'video04')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
		// video06
		driver.findElement(By.xpath("(//div[contains(text(),'video06')])[1]")).click();
		driver.findElement(By.xpath("(//i[@role='img'])[1]")).click();
	}
	 
	@AfterClass
	public void tearDown() throws Exception {
		if (driver != null) {
			((JavascriptExecutor) driver).executeScript("lambda-status=" + status);
			driver.quit();
		}
	}
}


