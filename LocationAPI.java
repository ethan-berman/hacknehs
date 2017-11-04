
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

import org.json.JSONArray;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.Charset;


//https://harrypotterapi.herokuapp.com/employees
//https://developers.google.com/places/web-service/

//https://maps.googleapis.com/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBvZjW6XVG8MMRvigi0yZ05HidQPC815ns

public class LocationAPI extends JFrame implements ActionListener
{
// final DefaultComboBoxModel panelName = new DefaultComboBoxModel();

    //private JButton getData = new JButton("Get Harry Potter Characters");
    private String mapurl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=3000&types=pet_store&key=AIzaSyBvZjW6XVG8MMRvigi0yZ05HidQPC815ns";
    private String geourl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=500&types=food&name=cruise&key=AIzaSyBvZjW6XVG8MMRvigi0yZ05HidQPC815ns";

    private String searcharea;
    private String nameoffood;
    private String stringhold;
    private String coordinates;

    private String lat;
    private String lng;
    private double holdint;

    public String test;


    private JButton search = new JButton("Search");
    private JButton plus= new JButton("+");
    private JButton minus = new JButton("-");


    private JLabel  addresslabel = new JLabel("Address:");
    //private JLabel petlabel = new JLabel("Type of Pet:");




    //private JButton id= new JButton("ID");

    public JTextField addressText= new JTextField();
    public JTextField petText = new JTextField();
    public JTextField data= new JTextField();


    public Restaurant[] restaurantArray = new Restaurant[10];
    public int counter;
    public int hold;

    private JSONObject myObject;
    private JSONArray myArray;

    // private String BreakA;






    public static void main(String args[])
    {
        LocationAPI application = new LocationAPI("Location App");	      //HarryPotter application = new H("personal info");		// construct a get
        application.resize(1000, 500);					// resize the frame
        application.show();								// show the frame


    }


    public LocationAPI(String title)
    {
        super(title);

        for (int x=0;x<10;x++){
            restaurantArray[x]=new Restaurant();
        }

        // Construct Panels
        JPanel centerPanel = new JPanel();
        JPanel centerPanelA = new JPanel();
        JPanel centerPanelB = new JPanel();
        JPanel southPanel = new JPanel();
        JPanel eastPanel = new JPanel();
        JPanel firstTextpanel = new JPanel();
        JPanel lastTextpanel = new JPanel();

        //This is everything bleow the center line
        JPanel firstPanel = new JPanel();
        JPanel secondPanel = new JPanel();



        // Setup Action Listener to the  Buttons
        plus.addActionListener(this);
        minus.addActionListener(this);
        // add.addActionListener(this);
        // open.addActionListener(this);
        // save.addActionListener(this);
        search.addActionListener(this);



        // Setup southPanel
        southPanel.setLayout(new GridLayout(3,1));
        southPanel.add(search);





        // Setup centerPanelA
        centerPanelA.setLayout(new GridLayout(2,1));
        centerPanelA.add(addresslabel);
        //centerPanelA.add(petlabel);


        // Setup centerPanelB
        centerPanelB.setLayout(new GridLayout(2,1));
        centerPanelB.add(firstTextpanel);
        centerPanelB.add(lastTextpanel);

        // Setup firstTextpanel
        firstTextpanel.setLayout(new GridLayout(1,1));
        firstTextpanel.add(addressText);

        // Setup lastTextPanel
        lastTextpanel.setLayout(new GridLayout(1,1));
        lastTextpanel.add(petText);


        // Setup CenterPanel
        centerPanel.setLayout(new BorderLayout());
        centerPanel.add("West", centerPanelA);
        centerPanel.add("Center", centerPanelB);


        //  Finaly put all the panels onto the first panel.

        firstPanel.setLayout(new BorderLayout());
        firstPanel.add("Center", centerPanel);
        // firstPanel.add("East", eastPanel);
        firstPanel.add("East", southPanel);


        //Create second panel

        //create an east panel with the buttons
        eastPanel.setLayout(new GridLayout(2,1));
        eastPanel.add(plus);
        eastPanel.add(minus);


        secondPanel.setLayout(new BorderLayout());
        secondPanel.add("Center", data);
        secondPanel.add("East", eastPanel);


        setLayout(new BorderLayout());
        add ("Center", secondPanel);
        add ("North", firstPanel);


    }






    private String read(String url){
        InputStream is;
        String jsonText = "";
        try {
            is = new URL(url).openStream();
            BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
            StringBuilder sb = new StringBuilder();

            int cp;
            while ((cp = rd.read()) != -1) {
                sb.append((char) cp);
            }
            jsonText=sb.toString();
            is.close();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        return(jsonText);
    }


    /////////////////HITTING BUTTONS/////////////////////////////////////////////////////
    public void  actionPerformed (ActionEvent e)
    {

        if(e.getSource() == minus)
        {

            System.out.println("hold is" +hold);
            System.out.println("counter is" +counter);

            if(hold==0){

                hold=counter-1;

            }
            else{
                hold--;
            }
            String text = "Location: " +restaurantArray[hold].location;
            data.setText(text);


        }
        if(e.getSource() == plus)
        {
            if(hold==counter-1){

                hold=0;
            }
            else{
                hold++;
            }
            String text = "Location: " +restaurantArray[hold].location;
            data.setText(text);



        }



        if(e.getSource() == search)

        {


            String location=addressText.getText().replaceAll(" ","+");
            System.out.println("THIS IS THE LOCATION I AM SEARCHING FOR"+location);


            try{

                geourl = "https://maps.googleapis.com/maps/api/geocode/json?address="+location+"&components=country:US&key=AIzaSyBvZjW6XVG8MMRvigi0yZ05HidQPC815ns";

                stringhold = read(geourl);

                coordinates=geocode(stringhold);// get the longitude and latitude
                String nameofpet= petText.getText().replaceAll(" ","+");





                //description="
                //mapurl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+coordinates+"&radius=2000&types=food"+nameoffood+"&key=AIzaSyBvZjW6XVG8MMRvigi0yZ05HidQPC815ns";
                mapurl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+coordinates+"&radius=2000&types=food&name="+nameofpet+"&key=AIzaSyBvZjW6XVG8MMRvigi0yZ05HidQPC815ns";
                stringhold=read(mapurl);

                restaurants(stringhold);

            }

            catch(Exception ex)
            {

                System.out.println(ex.toString());}






        }//end of search

    }   // end of Action Performed


    public String geocode(String s){
        String text = "";
        try{
            stringhold=s;
            myObject= new JSONObject(stringhold);

            myArray= myObject.getJSONArray("results");
            myObject = myArray.getJSONObject(0).getJSONObject("geometry").getJSONObject("location");
            holdint= myObject.getDouble("lat");

            lat = Double.toString(holdint);

            holdint= myObject.getDouble("lng");

            lng = Double.toString(holdint);


            text=lat+ "," + lng;
            System.out.println("HERE IS WHAT I AM GETTING" +text);

        }
        catch(Exception ex)
        {

            System.out.println(ex.toString());
        }



        return(text);




    }

    public void restaurants(String s){

        try{
            stringhold = s;


            myObject= new JSONObject(stringhold);
            myArray= myObject.getJSONArray("results");// this gets the json array from the json object breakJ

            for(int x=0;x<6;x++)
            {


                System.out.println("Get it++"+myArray.getJSONObject(x).getString("name"));
                System.out.println("Get it++"+myArray.getJSONObject(x).getString("vicinity"));

                restaurantArray[x].name = myArray.getJSONObject(x).getString("name");
                restaurantArray[x].location = myArray.getJSONObject(x).getString("vicinity");
                // holdint = myArray.getJSONObject(x).getDouble("rating");
                // restaurantArray[x].rating=Double.toString(holdint);
                hold=0;
                counter=6;

            }


            String text = "Location" +restaurantArray[0].location;
            data.setText(text);

        }//end of try

        catch(Exception ex)
        {

            System.out.println(ex.toString());}




    }//end of restaurants


}  // End of Class