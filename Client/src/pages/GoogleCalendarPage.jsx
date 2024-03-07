import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import GoogleCalendar from "../components/Reminder/GoogleCalendar";
import '../components/Reminder/reminder.module.css';

export default function GoogleCalendarPage() {
  return (
    <div>
      <Header />
      <div>
      <GoogleCalendar />
      <div>
      <Footer />
      </div>
    </div>
    </div>
  );
}
