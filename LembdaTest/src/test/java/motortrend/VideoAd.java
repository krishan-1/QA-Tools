package motortrend;

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

public class VideoAd{
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
		capabilities.setCapability("build", "MotorTrend");
		capabilities.setCapability("name", "VideoAd");
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
	  public void videoplaypause () throws Exception {
	    driver.get("https://experience.sourcesync.io/694");
	    Thread.sleep(500); 
	 // Play
	    driver.findElement(By.xpath("(//button[@class='plyr__control plyr__control--overlaid'])[1]")).click();
		Thread.sleep(2000);
		 // iframe 01
	    driver.findElement(By.xpath("(//div[contains(text(),'iframe01')])[1]")).click();
		Thread.sleep(500);
	 // Pause
	    driver.findElement(By.xpath("(//button[@data-plyr='play'])[1]")).click();
	    Thread.sleep(1000);
	 // Play
	    driver.findElement(By.xpath("(//button[@aria-label='Pause'])[1]")).click();
		Thread.sleep(1000);

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
	 
	@AfterClass
	public void tearDown() {
		if (driver != null) {
			((JavascriptExecutor) driver).executeScript("lambda-status=" + status);
			driver.quit();
		}
	}
}
